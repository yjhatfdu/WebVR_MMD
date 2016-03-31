System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var MMDModel;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by yjh on 16/3/30.
             */
            ///<reference path="../typings/threejs/three.d.ts"/>
            MMDModel = (function (_super) {
                __extends(MMDModel, _super);
                function MMDModel(loader) {
                    _super.call(this);
                    this.loader = loader;
                    var verticles = this.loader.verticles;
                    var count = verticles.length;
                    var positionArray = new Float32Array(count * 3);
                    var uvArray = new Float32Array(count * 2);
                    var normalArray = new Float32Array(count * 3);
                    var boneNumberArray = new Float32Array(count * 4);
                    var boneWeightArray = new Float32Array(count * 4);
                    var edgeFlagArray = new Uint8Array(count);
                    for (var i = 0; i < count; i++) {
                        var v = verticles[i];
                        positionArray[i * 3] = v.x;
                        positionArray[i * 3 + 1] = v.y;
                        positionArray[i * 3 + 2] = v.z;
                        uvArray[i * 2] = v.u;
                        uvArray[i * 2 + 1] = v.v;
                        normalArray[i * 3] = v.nx;
                        normalArray[i * 3 + 1] = v.ny;
                        normalArray[i * 3 + 2] = v.nz;
                        boneNumberArray[i * 4] = v.bone_num1;
                        boneNumberArray[i * 4 + 1] = v.bone_num2;
                        boneWeightArray[i * 4] = v.bone_weight;
                        boneWeightArray[i * 4 + 1] = 1 - v.bone_weight;
                        edgeFlagArray[i] = v.edge_flag;
                    }
                    this.oriPositionArray = new Float32Array(positionArray);
                    this.positionBuffer = new THREE.BufferAttribute(positionArray, 3);
                    this.addAttribute('position', this.positionBuffer);
                    this.addAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
                    this.addAttribute('normal', new THREE.BufferAttribute(normalArray, 3));
                    this.addAttribute('skinIndex', new THREE.BufferAttribute(boneNumberArray, 4));
                    this.addAttribute('skinWeight', new THREE.BufferAttribute(boneWeightArray, 4));
                    this.addAttribute('edgeFlag', new THREE.BufferAttribute(edgeFlagArray, 1));
                    count = 0;
                    var index = 0;
                    this.index = new THREE.BufferAttribute(loader.triangles, 1);
                    for (var _i = 0, _a = loader.materials; _i < _a.length; _i++) {
                        var material = _a[_i];
                        this.addGroup(count, material.face_vert_count, index);
                        index++;
                        count += material.face_vert_count;
                    }
                }
                return MMDModel;
            })(THREE.BufferGeometry);
            exports_1("MMDModel", MMDModel);
        }
    }
});
//# sourceMappingURL=Model.js.map