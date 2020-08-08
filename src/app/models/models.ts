export class IBoringDeed {
    name: string;
    x: number;
    y: number
    notes: string;
}

export class ICanal {
    ID: number;
    Server: number;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    Name: string;
    IsCanal: boolean;
    IsTunnel: boolean;
    AllBoats: boolean;
    Notes: string;
}

export class IBridge {
    Name: string;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
}

export class ILandmark {
    Name: string;
    X1: number;
    Y1: number;
    LandmarkType: string;
    Notes: string;
}