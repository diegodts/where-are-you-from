# where-are-you-from
Where are you from? A pondered geographical average of where you are from, based on places you lived and for how long you lived in each place.

## Inputs

A list of pairs (place you lived, how much time). Example:
- New York, 20 years
- San Francisco, 5 years
- Fort Lauderdale, 7 years

We will get the lat,long for each city.

## Outputs

A geographical location (lat, long) that represents the pondered average of all the places you have lived, using the time you lived in each place.

## Calculation

1. Get the lat,long for each city
2. Separate lat and long
3. For each city, multiply lat*time
4. For each city, multiply long*time
5. Sum all the lat*time, divide by the sum of time
6. Sum all the long*time, divide by the sum of time
7. Concatenate the result from item 5 with item 6. This is your location
8. Plot on the map
