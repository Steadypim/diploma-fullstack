package dev.steadypim.multimodalb2bshipmentdiploma.general.geocode;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeocodingService {

    private final OkHttpClient client = new OkHttpClient();

    public Map<String, Double> geocodeAddress(Address address) throws Exception {
        String API_KEY = "e1a874e4-9f7f-4cb8-868f-a69e7bf72388";
        Request request = new Request.Builder()
                .url("https://graphhopper.com/api/1/geocode?q=" + address.toString() + "&locale=ru&key=" + API_KEY + "&provider=nominatim&limit=1")
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to geocode address: " + response.body().string());
            }


            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.body().string());

            Map<String, Double> result = new HashMap<>();

            JsonNode hitsArray = rootNode.path("hits");
            if (hitsArray.isArray() && hitsArray.size() > 0) {
                JsonNode firstHit = hitsArray.get(0).path("point");
                double lat = firstHit.path("lat").asDouble();
                double lng = firstHit.path("lng").asDouble();

                result.put("lat", lat);
                result.put("lng", lng);
            }

            return result;
        }
    }
}
