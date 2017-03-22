# 01_http_client
Class exercise in using the http and get with node servers

The link to the instructions for this project can be found here:
https://github.com/nashville-software-school/node-milestones/blob/master/02-db-driven-applications/exercises/01-http_client.md


Help from Joe:
Speaking of extra info, it seems that the MarkitOnDemand docs were updated at some point and are now even less helpful.
So, here's a bit of extra help.
After that basic URL, `http://dev.markitondemand.com/Api/v2/InteractiveChart` you are going to need to tell the API what you want back from it
You start by adding `/json` to the URL, since the API defaults to sending XML (Rare these days)
After that you add on your query parameters. You signal the beginning of the query with `?`
Then tack on `parameters={ }` and fill that object with the parameters we want to set. Those are some data formatting things, like the span of days we want, whether we want the data in price units or not, whether we want one day's price or hourly or whatever, and then the `elements` which are basically the `WHERE x is foo` query filters.

So, in our case we would have something like this:
`http://dev.markitondemand.com/Api/v2/InteractiveChart/json?parameters{ "Normalized"; false, "NumberOfDays": 365, "DataPeriod": "Day", ` then all the elements. Note that the docs say to add the elements value as an array of 1 or more elements. Then you look down at the elements chart and see that you can add `Symbol`, `Type`, and yes another `Params` property. The only param you need at that level is ["c"] for close only.

Whew. API docs are so much fun :troll:
