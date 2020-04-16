export interface IData {
    confirmed : IDetails;
    recovered : IDetails;
    deaths : IDetails;
    lastUpdate : string;
}

interface IDetails {
    value : number;
    details : string;
}