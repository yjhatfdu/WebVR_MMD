import {PMDLoader} from "./PMDLoader";
/**
 * Created by yjh on 16/3/30.
 */
    ///<reference path="../typings/threejs/three.d.ts"/>

export class MMDModel extends THREE.BufferGeometry{
    loader:PMDLoader;
    positionBuffer:THREE.BufferAttribute;
    oriPositionArray:Float32Array;
    constructor(loader:PMDLoader){
        super();
        this.loader=loader;
        let verticles=this.loader.verticles;
        let count=verticles.length;
        let positionArray=new Float32Array(count*3);
        let uvArray=new Float32Array(count*2);
        let normalArray=new Float32Array(count*3);
        let boneNumberArray=new Float32Array(count*4);
        let boneWeightArray=new Float32Array(count*4);
        let edgeFlagArray=new Uint8Array(count);
        for(let i=0;i<count;i++){
            let v=verticles[i];
            positionArray[i*3]=v.x;
            positionArray[i*3+1]=v.y;
            positionArray[i*3+2]=v.z;
            uvArray[i*2]=v.u;
            uvArray[i*2+1]=v.v;
            normalArray[i*3]=v.nx;
            normalArray[i*3+1]=v.ny;
            normalArray[i*3+2]=v.nz;
            boneNumberArray[i*4]=v.bone_num1;
            boneNumberArray[i*4+1]=v.bone_num2;
            boneWeightArray[i*4]=v.bone_weight;
            boneWeightArray[i*4+1]=1-v.bone_weight;
            edgeFlagArray[i]=v.edge_flag;
        }
        this.oriPositionArray=new Float32Array(positionArray);
        this.positionBuffer=new THREE.BufferAttribute(positionArray,3);
        this.addAttribute('position',this.positionBuffer);
        this.addAttribute('uv',new THREE.BufferAttribute(uvArray,2));
        this.addAttribute('normal',new THREE.BufferAttribute(normalArray,3));
        this.addAttribute('skinIndex',new THREE.BufferAttribute(boneNumberArray,4));
        this.addAttribute('skinWeight',new THREE.BufferAttribute(boneWeightArray,4));
        this.addAttribute('edgeFlag',new THREE.BufferAttribute(edgeFlagArray,1));
        count=0;
        let index=0;
        this.index=new THREE.BufferAttribute(loader.triangles,1);
        for(let material of loader.materials){
            this.addGroup(count,material.face_vert_count,index);
            index++;
            count+=material.face_vert_count;
        }

    }

}