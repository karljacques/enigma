const AU = 100;

const sunRadius = 0.00465047 * AU;

const solOrbitDistances = {
    mercury: 0.39 * AU,
    venus:   0.7 * AU,
    earth:   AU,
    mars:    1.524 * AU,
    jupiter: 5.2 * AU,
    saturn:  9.6 * AU,
    neptune: 30.1 * AU,
    pluto:   39.5 * AU,
};

const gamePacing   = 160.0;
const speedOfLight = AU * 0.00200399 * gamePacing;


export {AU, sunRadius, solOrbitDistances, speedOfLight};

