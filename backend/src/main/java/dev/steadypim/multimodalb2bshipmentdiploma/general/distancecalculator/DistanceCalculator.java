package dev.steadypim.multimodalb2bshipmentdiploma.general.distancecalculator;

public class DistanceCalculator {
    private static final double EARTH_RADIUS = 6371.0;

    public static double calculateDistance(double sourceLat, double sourceLon, double destinationLat, double destinationLon) {

        double latitudeDifference = Math.toRadians(destinationLat - sourceLat);
        double longitudeDifference = Math.toRadians(destinationLon - sourceLon);

        double a = Math.pow(Math.sin(latitudeDifference / 2), 2) + Math.cos(Math.toRadians(sourceLat))
                                                                   * Math.cos(Math.toRadians(destinationLat))
                                                                   * Math.pow(Math.sin(longitudeDifference / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;

    }
}
