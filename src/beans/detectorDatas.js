export default class DetectorData{
    constructor({did,type,index,timestamp,value}){
        this.did = did
        this.type = type
        this.index = index
        this.values = value
    }
}

export function createDetectorData(detectorData){
    return new DetectorData({
        did:detectorData.did,
        type :detectorData.type ,
        index:detectorData.index,
        values:detectorData.value

    })
}
