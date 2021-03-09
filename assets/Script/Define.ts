export namespace Define { 
    export class GameMode {
        static HARD:number = 5;
        static NORMAL:number = 4;
        static EASY:number = 3;
    }

    export enum TYPE {
        A,
        B,
        END,
    }
    
    export enum HEADTYPE {
        ROUND,
        CONE,
        HEART,
    }
    
    export enum COLOR {
        //EMPTY,
        GREEN,
        BLUE,
        YELLOW,
        PURPLE,
        PINK,
        END,
    }
    
    export enum SKIN {
        AQUA_1,
        BLUE_2,
        GREEN_3,   
        PINK_1,
        YELLOW_2,
        ORANGE_3,
        END
    }
    
    export enum FEATURE {
        EYES,
        NOSE,
        MOUTH,
        HEAD,
        BODY,
        NUM
    }
}
