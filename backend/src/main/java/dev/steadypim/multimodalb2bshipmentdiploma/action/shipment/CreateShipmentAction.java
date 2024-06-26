package dev.steadypim.multimodalb2bshipmentdiploma.action.shipment;

import dev.steadypim.multimodalb2bshipmentdiploma.general.distancecalculator.DistanceCalculator;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.service.ShipmentService;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service.TransportationRouteService;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.jgrapht.Graph;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.AStarShortestPath;
import org.jgrapht.graph.SimpleDirectedWeightedGraph;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class CreateShipmentAction {

    private final WarehouseService warehouseService;
    private final TransportationRouteService transportationRouteService;
    private final ShipmentService shipmentService;

    public Shipment createShipment(CreateShipmentArgument argument, String email) {

        // Создаем граф
        Graph<Warehouse, TransportationRoute> graph = createGraph();

        // Задаем начальную и конечную точки
        Warehouse startPoint = warehouseService.get(argument.sourceWarehouse());
        Warehouse endPoint = warehouseService.get(argument.destinationWarehouse());

        // Находим оптимальный маршрут
        GraphPath<Warehouse, TransportationRoute> shortestPath = findShortestPath(graph, startPoint, endPoint);


        BigDecimal fullPrice = calculateTotalPrice(shortestPath.getEdgeList(), argument.weight());

        Shipment shipment = new Shipment(startPoint, endPoint, shortestPath.getEdgeList(), fullPrice, argument.weight(), argument.name(), argument.description());

        return shipmentService.create(shipment, email);
    }

    private Graph<Warehouse, TransportationRoute> createGraph() {
        Graph<Warehouse, TransportationRoute> graph = new SimpleDirectedWeightedGraph<>(TransportationRoute.class);

        // Получаем все склады из базы данных
        List<Warehouse> warehouses = warehouseService.getAllWarehouses();

        for (Warehouse warehouse : warehouses) {
            graph.addVertex(warehouse);
        }

        // Получаем все транспортные маршруты из базы данных
        List<TransportationRoute> transportationRoutes = transportationRouteService.getAllTransportationRoutes();

        for (TransportationRoute route : transportationRoutes) {
            Warehouse sourceWarehouse = route.getSourceWarehouse();
            Warehouse destinationWarehouse = route.getDestinationWarehouse();
            // Проверяем наличие вершин в графе перед добавлением ребра
            if (graph.containsVertex(sourceWarehouse) && graph.containsVertex(destinationWarehouse)) {
                double weight = route.getPrice().doubleValue();

                // Проверяем наличие ребра в графе перед добавлением
                if (!graph.containsEdge(sourceWarehouse, destinationWarehouse)) {
                    graph.addEdge(sourceWarehouse, destinationWarehouse, route);
                    graph.setEdgeWeight(route, weight);
                }
            }
        }


        return graph;

    }


    private GraphPath<Warehouse, TransportationRoute> findShortestPath(Graph<Warehouse, TransportationRoute> graph, Warehouse startPoint, Warehouse endPoint) {
        AStarShortestPath<Warehouse, TransportationRoute> aStarShortestPath = new AStarShortestPath<>(graph, (sourceVertex, targetVertex) -> {
            double distance = DistanceCalculator.calculateDistance(
                    sourceVertex.getLatitude(), sourceVertex.getLongitude(),
                    targetVertex.getLatitude(), targetVertex.getLongitude()
                                                                  );
            double currentPathCost = calculateCurrentPathCost(graph, sourceVertex);
            return distance + currentPathCost;
        });

        return aStarShortestPath.getPath(startPoint, endPoint);
    }

    private double calculateCurrentPathCost(Graph<Warehouse, TransportationRoute> graph, Warehouse currentVertex) {
        // Пример: Рассчитываем стоимость текущего пути как сумму стоимостей всех исходящих ребер из текущей вершины.
        double currentPathCost = 0.0;

        Set<TransportationRoute> outgoingRoutes = graph.outgoingEdgesOf(currentVertex);
        List<TransportationRoute> routes = outgoingRoutes.stream().toList();
        for (int i = 0; i < routes.size(); i++) {
            TransportationRoute route = routes.get(i);
            double transportationPrice = route.getPrice().doubleValue();
            double sourceWarehousePrice = route.getSourceWarehouse().getPrice().doubleValue();
            double totalPriceForRoute;
            if (i == routes.size() - 1) {
                double lastWarehousePrice = route.getDestinationWarehouse().getPrice().doubleValue();
                totalPriceForRoute = transportationPrice + lastWarehousePrice + sourceWarehousePrice;
            } else {
                totalPriceForRoute = transportationPrice + sourceWarehousePrice;
            }
            currentPathCost += totalPriceForRoute;

        }

        return currentPathCost;
    }


    private BigDecimal calculateTotalPrice(List<TransportationRoute> routes, double weight) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        BigDecimal prevWarehousePricePerKg = null;
        for (int i = 0; i < routes.size(); i++) {
            TransportationRoute route = routes.get(i);
            BigDecimal warehousePricePerKg = route.getSourceWarehouse().getPrice();
            BigDecimal routePricePerKg = route.getPrice();
            BigDecimal totalPriceForRoute;
            if (i == routes.size() - 1) {
                // Последний маршрут - учитываем цену из склада получения
                BigDecimal lastWarehousePricePerKg = route.getDestinationWarehouse().getPrice();
                totalPriceForRoute = BigDecimal.valueOf(weight).multiply(lastWarehousePricePerKg.add(routePricePerKg).add(warehousePricePerKg));
            } else {
                totalPriceForRoute = BigDecimal.valueOf(weight).multiply(warehousePricePerKg.add(routePricePerKg));
            }
            totalPrice = totalPrice.add(totalPriceForRoute);
        }
        return totalPrice;
    }

}


