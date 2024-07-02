import { makeAutoObservable } from "mobx";
import { ScannedSku, Sku } from "../data";

export class SkuStore {
    // TODO: maybe load from localstorage (local forage) for fun?
    public knownSkus: Sku[] = [
        {
            sku: "XRE-TEZ Pro",
            description: "Super dooper kewl boot technology"
        },
        {
            sku: "KS-Ample-Y",
            description: "Some other Boot item"
        }
    ];

    public unknownSku?: string;

    public scannedSkus: ScannedSku[] = [];

    private pendingScan: string = '';

    private clearTimer?: NodeJS.Timer;

    public constructor() {
        makeAutoObservable(this);

        window.addEventListener('keypress', this.handleKeypress);

        this.clearPendingScan();
    }

    public updateSkuQuantity = (sku: Sku, quantity: number) => {
        const previousScan = this.scannedSkus.find(scannedSku => scannedSku.sku.sku === sku.sku);
        if(previousScan){
            previousScan.quantity = quantity;
            return;
        }
    }

    public addNewSku = (sku: Sku, addInitialQuantity: boolean = true) => {
        this.knownSkus = [...this.knownSkus, sku];

        // TODO: Maybe just add the new sku directly to this.scannedSkus but i like that this would beep
        if(addInitialQuantity){
            this.handleScan(sku.sku);
        }
    }

    private beep = (happy: boolean) => {
        if(happy){
            new Audio("beep.mp3").play();
            return;
        }
        new Audio("warning.mp3").play();
    }

    private setClearTimer = () => {
        clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout( this.clearPendingScan, 1000);
    }

    private clearPendingScan = () => {
        this.pendingScan = '';
        
    }

    private handleKeypress = (event: KeyboardEvent) => {
        this.setClearTimer();
        if(event.key != "Enter"){
            this.pendingScan += event.key;
            return;
        }

        
        this.handleScan(this.pendingScan);

        this.clearPendingScan();
    }

    private handleScan = (scanValue: string) => {
        // If this has already been scanned then increment the quantity and return
        const previousScan = this.scannedSkus.find(scannedSku => scannedSku.sku.sku === scanValue);
        if(previousScan){
            previousScan.quantity++;
            this.beep(true);
            return;
        }

        // If this is a known sku add it to scannedSkus and return
        const knownSku = this.knownSkus.find(knownSku => knownSku.sku === scanValue );
        if(knownSku){
            this.scannedSkus = [...this.scannedSkus, {sku: knownSku, quantity: 1}]
            this.beep(true);
            return;
        }

        this.beep(false);
        this.unknownSku = scanValue;
    }
}
