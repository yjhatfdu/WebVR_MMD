System.register(["./PMDLoader", "./Model", "./Material"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var PMDLoader_1, Model_1, Material_1;
    var MMD;
    return {
        setters:[
            function (PMDLoader_1_1) {
                PMDLoader_1 = PMDLoader_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            },
            function (Material_1_1) {
                Material_1 = Material_1_1;
            }],
        execute: function() {
            /**
             * Created by yjh on 16/3/30.
             */
            MMD = (function (_super) {
                __extends(MMD, _super);
                function MMD(loader) {
                    _super.call(this);
                    this.model = new Model_1.MMDModel(loader);
                    this.material = Material_1.getMaterial(loader);
                    //this.material=new THREE.MeshNormalMaterial();
                    this.mmdMesh = new THREE.SkinnedMesh(this.model, this.material, true);
                    this.add(this.mmdMesh);
                }
                MMD.create = function (pmdFile) {
                    return new Promise(function (resolve) {
                        PMDLoader_1.PMDLoader.load(pmdFile).then(function (loader) {
                            resolve(new MMD(loader));
                        });
                    });
                };
                return MMD;
            })(THREE.Object3D);
            exports_1("MMD", MMD);
        }
    }
});
//# sourceMappingURL=MMD.js.map