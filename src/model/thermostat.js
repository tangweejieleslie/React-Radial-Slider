export function getModeColor(targetTemperature, currentTemperature, currentModeColor) {

    console.log("computing mode");

    const dt = 2;
    const dtHeat = 1;
    const dtCool = 1.5;

    let modeColor = "";

    console.log(modeColor);
    let UpperBoundTemp =
        targetTemperature + dt + dtCool;
    let LowerBoundTemp =
        targetTemperature - dt - dtHeat;
    let OffUpperBound =
        targetTemperature + (dt - dtCool);
    let OffLowerBound =
        targetTemperature - (dt - dtHeat);

    if (currentTemperature > UpperBoundTemp) {
        modeColor = "#3495E4";
    } else if (currentTemperature < LowerBoundTemp) {

        modeColor = "#E4656E";

    } else if (
        currentTemperature < OffUpperBound &&
        currentTemperature > OffLowerBound
    ) {
        modeColor = "#D6D6D6";
    } else {
        console.log("no category")
        modeColor = currentModeColor;
    }

    console.log(modeColor);
    return modeColor;
}
