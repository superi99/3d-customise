import grass from "../textures/grass0.png";
const grss = new THREE.TextureLoader().load(grass);
function MaterialMap(mat) {
    mat = new THREE.MeshStandardMaterial();
    mat.map = grss;
    mat.map.repeat.x = 0.0002;
    mat.map.repeat.y = 0.0002;
    mat.color.setHex(0x29540a);
}
const gltf = useLoader(GLTFLoader, props.url);
let meshes = gltf.scene.children;
let modelParts = map(meshes, (el, ii) => {
    if (meshes[ii] instanceof THREE.Group) {
        meshes[ii].children.forEach(function (m) {
            m.material = MaterialMap(m.material);
            m.receiveShadow = true;
        })
        el.receiveShadow = true;
    } else {
        if (meshes[ii].material) {
            meshes[ii].material = MaterialMap(meshes[ii].material);
        }
    }
    return (
        <primitive
            object={el.clone()}
            key={meshes[ii].name + props.hook + ii}
            name={meshes[ii].name}
        />
    )
})
return modelParts;
