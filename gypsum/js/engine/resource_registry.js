Engine.ResourceRegistry = class ResourceRegistry {
  constructor(renderer) {
    this._materials = {}
    this._geometries = {}
    this._meshes = {}
    this._renderer = renderer
  }

  get materials() { return this._materials }
  get geometry() { return this._geometries }
  get meshes() { return this._meshes }

  registerMaterial(name, material_params) {
    this._materials[name] = new Engine.Material(
      material_params.ambient,
      material_params.diffuse,
      material_params.specular,
      material_params.shininess,
    )
  }

  registerGeometry(name, geometry_params) {
    this._geometries[name] = new Engine.Geometry(
      geometry_params.vertices,
      geometry_params.normals
    )
  }

  registerMesh(name, mesh_params) {
    var mesh = new Engine.Mesh(
      this._geometries[mesh_params.geometry],
      this._materials[mesh_params.material]
    )

    this._renderer.initMesh(mesh)

    this._meshes[name] = mesh
  }
}
