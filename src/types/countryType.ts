interface NativeName {
    official: string;
    common: string;
}

interface Name {
    common: string;
    official: string;
    nativeName: {
        cat: NativeName;
    };
}

interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export default interface Country {
    flags: Flags;
    name: Name;
    unMember: boolean;
    region: string;
    borders: string[];
    area: number;
    flag: string;
    population: number;
    cca2: string;
}

