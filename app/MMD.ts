import {PMDLoader} from "./PMDLoader";
import {MMDModel} from "./Model";
import {getMaterial} from "./Material";
/**
 * Created by yjh on 16/3/30.
 */
export class MMD extends THREE.Object3D{
    static create(pmdFile):Promise<MMD>{
         return new Promise(resolve=>{PMDLoader.load(pmdFile).then(loader=>{
             resolve (new MMD(loader as PMDLoader))
         })})
    }
    model:MMDModel;
    material;
    mmdMesh:THREE.SkinnedMesh;
    constructor(loader:PMDLoader){
        super();
        this.model=new MMDModel(loader);
        this.material=getMaterial(loader);
        //this.material=new THREE.MeshNormalMaterial();
        this.mmdMesh=new THREE.SkinnedMesh(this.model,this.material,true);
        this.add(this.mmdMesh);
    }
}