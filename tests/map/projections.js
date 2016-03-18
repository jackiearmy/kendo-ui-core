(function() {
    var TOLERANCE = Math.pow(10, -6),
        COORD_PRECISION = 6;

    var dataviz = kendo.dataviz,
        round = dataviz.round,
        Point = dataviz.Point2D,

        map = dataviz.map,
        projections = map.projections,
        Location = map.Location;

    function forward(proj, geoPoint, point) {
        var p = proj.forward(geoPoint);
        close(p.x, point.x, TOLERANCE, "X");
        close(p.y, point.y, TOLERANCE, "Y");
    }

    function inverse(proj, point) {
        var r = proj.inverse(point);
        var p = proj.forward(r);
        close(p.x, point.x, TOLERANCE, "X");
        close(p.y, point.y, TOLERANCE, "Y");
    }

    (function() {

        // [[LAT, LONG], [X, Y]]
        // Reference values obtained by cs2cs 4.7.1 (latitude clipped to MAX_LAT)
        // cs2cs -v -f "%.11f" -r +init=epsg:4326 +to +init=epsg:3395
        var mercatorIdentities = [
                // Center
                [[0, 0], [0, 0]],

                // NE corner
                [[90, 180],
                 [20037508.34278924763, 20037508.34277573600]],

                // SW corner
                [[-90, -180],
                 [-20037508.34278924763, -20037508.34277572483]],

                // Test points
                [[42.7175, 24.916667],
                 [2773710.68270556396, 5240075.61980005074]],

                [[51.9371170300465, 80.11230468750001],
                 [8918060.96408808604, 6755099.41088569630]],

                [[52.4827802220782, -5.625],
                 [-626172.1357121640, 6853979.3008168675]],

                // Longitude out of bounds
                [[-90, -360],
                 [-40075016.68557849, -20037508.34277572]]
            ];

        var mercator;

        // ------------------------------------------------------------
        module("Projections / Mercator", {
            setup: function() {
                mercator = new projections.Mercator();
            }
        });

        test("forward", function() {
            $.each(mercatorIdentities, function() {
                var geo = this[0];
                var point = this[1];

                forward(mercator,
                    new Location(geo[0], geo[1]),
                    new Point(point[0], point[1]));
            });
        });

        test("forward with central meridian", function() {
            mercator = new projections.Mercator({
                centralMeridian: 24
            });

            forward(mercator,
                new Location(42.7175, 24.916667),
                new Point(102042.90366699788, 5240075.61980005074)
            );
        });

        test("forward with longitude clamping", function() {
            var loc = new Location(0, -360);
            var point = mercator.forward(loc, true);
            close(point.x, -20037508.34278924763, TOLERANCE);
        });

        test("inverse", function() {
            $.each(mercatorIdentities, function() {
                var point = this[1];

                inverse(mercator,
                    new Point(point[0], point[1]));
            });
        });

        test("inverse with central meridian", function() {
            mercator = new projections.Mercator({
                centralMeridian: 24
            });

            inverse(mercator,
                new Point(102042.90366699788, 5240075.61980005074)
            );
        });

        test("inverse with longitude clamping", function() {
            var point = new Point(-40000000, 0);
            var loc = mercator.inverse(point, true);
            equal(loc.lng, -180);
        });
    })();

    (function() {

        // [[LAT, LONG], [X, Y]]
        // Reference values obtained by cs2cs 4.7.1 (latitude clipped to MAX_LAT)
        // cs2cs -v -f "%.11f" -r +init=epsg:4326 +to +init=epsg:3857
        var mercatorIdentities = [
                // Center
                [[0, 0], [0, 0]],

                // NE corner
                [[90, 180],
                 [20037508.34278924763, 20037508.34278073907]],

                // SW corner
                [[-90, -180],
                 [-20037508.34278924763, -20037508.34278075024]],

                // Test points
                [[42.7175, 24.916667],
                 [2773710.68270556396, 5269070.84282853827]],

                [[51.9371170300465, 80.11230468750001],
                 [8918060.96408808976, 6788763.38325125352]],

                [[52.4827802220782, -5.625],
                 [-626172.13571216457, 6887893.49283379968]],

                // Longitude out of bounds
                [[-90, -360],
                 [-40075016.68557849, -20037508.34278074]]
            ];

        var mercator;

        // ------------------------------------------------------------
        module("Projections / Spherical Mercator", {
            setup: function() {
                mercator = new projections.SphericalMercator();
            }
        });

        test("forward", function() {
            $.each(mercatorIdentities, function() {
                var geo = this[0];
                var point = this[1];

                forward(mercator,
                    new Location(geo[0], geo[1]),
                    new Point(point[0], point[1]));
            });
        });

        test("forward with longitude clamping", function() {
            var loc = new Location(0, -360);
            var point = mercator.forward(loc, true);
            close(point.x, -20037508.34278924763, TOLERANCE);
        });

        test("inverse", function() {
            $.each(mercatorIdentities, function() {
                var point = this[1];

                inverse(mercator,
                    new Point(point[0], point[1]));
            });
        });

        test("inverse with longitude clamping", function() {
            var point = new Point(-40000000, 0);
            var loc = mercator.inverse(point, true);
            equal(loc.lng, -180);
        });

    })();

    (function() {
        var proj;

        // ------------------------------------------------------------
        module("Projections / Equirectangular", {
            setup: function() {
                proj = new projections.Equirectangular;
            }
        });

        test("forward", function() {
            forward(proj,
                new Location(90, 180),
                new Point(180, 90)
            );
        });

        test("inverse", function() {
            inverse(proj,
                new Point(180, 90),
                new Location(90, 180)
            );
        });

    })();
})();