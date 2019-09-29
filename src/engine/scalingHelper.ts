class LengthMeasurement {
    static readonly AU = 100000000;
    static readonly M = LengthMeasurement.AU / (1.496 * Math.pow(10, 11));
    static readonly KM = LengthMeasurement.M * 1000;
}


class SpeedMeasurement {
    static readonly gamePacing = 160.0;
    static readonly speedOfLight = LengthMeasurement.AU * 0.00200399 * SpeedMeasurement.gamePacing;
}

class SolarSystemScaling {
    static readonly sunRadius = 0.00465047 * LengthMeasurement.AU;

    static readonly solOrbitDistances = {
        mercury: 0.39 * LengthMeasurement.AU,
        venus: 0.7 * LengthMeasurement.AU,
        earth: LengthMeasurement.AU,
        mars: 1.524 * LengthMeasurement.AU,
        jupiter: 5.2 * LengthMeasurement.AU,
        saturn: 9.6 * LengthMeasurement.AU,
        neptune: 30.1 * LengthMeasurement.AU,
        pluto: 39.5 * LengthMeasurement.AU,
    };
}

export {LengthMeasurement, SpeedMeasurement, SolarSystemScaling};

