/**
 * Created by yjh on 16/3/30.
 */
import {PMDLoader} from "./PMDLoader";
export function getMaterial(loader:PMDLoader){
    let materialList=[];
    let pmdPath=loader.url;
    let pathParts=pmdPath.split('/');
    pathParts=pathParts.slice(0,pathParts.length-1);
    pmdPath=pathParts.join('/');
    for(let material of loader.materials){
        let texture;
        let newMaterial=new THREE.MeshPhongMaterial({
        });
        if(material.texture_file_name){


            texture=new THREE.TextureLoader().load(pmdPath +'/'+material.texture_file_name);
            newMaterial.map=texture;
            //newMaterial.color=texture;
            //newMaterial.map=texture;
            //newMaterial.specularMap=texture;
            window['testm']=newMaterial;
        }


        newMaterial.shininess=material.shininess;
        newMaterial.color=new THREE.Color(material.diffuse[0],material.diffuse[1],material.diffuse[2]);
        newMaterial.specular=new THREE.Color(material.specular[0],material.specular[1],material.specular[2]);
        //newMaterial.emissive=new THREE.Color(material.ambient[0],material.ambient[1],material.ambient[2]);
        //newMaterial.skinning=true;
        newMaterial.depthWrite=true;
        newMaterial.depthTest=true;
        materialList.push(newMaterial);
    }
    return new THREE.MultiMaterial(materialList)
}