// https://css-tricks.com/using-react-and-xstate-to-build-a-sign-in-form/
const MachineConfig = {
    context: {
        mode: "off",
        targetTemp: 72,
        currentTemp: 72
    },
    id: 'ThermostatMachine',
    initial: 'ListenForTemperatureChange',
    states: {
        ListenForTemperatureChange: {
            type: 'parallel',
            on: {
                TemperatureUpdate: 'CheckMode'
            },
            states: {
                UpdateTargetTemperature: {
                    initial: 'ListenForTTChange',
                    states: {
                        ListenForTTChange: {
                            on: {
                                TT_change: "TT_CheckTemp",
                                TT_noChange: "ListenForTTChange"
                            }
                        },
                        TT_CheckTemp: {
                            on: {
                                TT_TempTooHigh: "TT_Invalid",
                                TT_TempTooLow: "TT_Invalid",
                                TT_TempOK: "TT_Update"
                            }
                        },
                        TT_Invalid: {
                            on: {
                                TT_Listen: "ListenForTTChange",
                            }
                        },
                        TT_Update: {}
                    }

                },
                UpdateCurrentTemperature: {
                    initial: 'ListenForCTChange',
                    states: {
                        ListenForCTChange: {
                            on: {
                                change: "CT_CheckTemp",
                                noChange: "ListenForCTChange"
                            }
                        },
                        CT_CheckTemp: {
                            on: {
                                CT_TempTooHigh: "CT_Invalid",
                                CT_TempTooLow: "CT_Invalid",
                                CT_TempOK: "CT_Update"
                            }
                        },
                        CT_Invalid: {
                            on: {
                                CT_Listen: "ListenForCTChange",
                            }
                        },
                        CT_Update: {}
                    }
                },
            }


        },
        CheckMode: {
            on: {
                ModeUpdate: 'ListenForTemperatureChange'
            },
            initial: 'CheckMode',
            states: {
                CheckMode: {
                    on: {
                        CONDITION_1: 'Cooling',
                        CONDITION_2: 'Heating',
                        CONDITION_3: 'Off',
                        CONDITION_4: 'History',
                    }
                },
                Cooling: {},
                Heating: {},
                Off: {},
                History: {}
            }
        }

    }
}

export default MachineConfig