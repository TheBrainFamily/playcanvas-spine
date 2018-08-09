import pc from 'framework/libs/playcanvas-latest'
var Spine = pc.createScript('spine')

Spine.attributes.add('atlas', { type: 'asset', assetType: 'text' })
Spine.attributes.add('skeleton', { type: 'asset', assetType: 'json' })
Spine.attributes.add('textures', { type: 'asset', array: true, assetType: 'texture' })
Spine.attributes.add('priority', { type: 'number', default: 1 })
Spine.attributes.add('element', { type: 'element', default: null })

Spine.prototype.initialize = function() {
  if (this.atlas && this.textures && this.skeleton) {
    // If all assets are present, add the spine component to the entity

    this.entity.addComponent('spine', {
      screenSpace: true,
      atlasAsset: this.atlas.id,
      textureAssets: this.textures.map(function(a) {
        return a.id
      }),
      skeletonAsset: this.skeleton.id,
    })

    if (this.entity.spine) {
      this.priority = this.priority ? this.priority : 0
      this.entity.spine.spine.priority = this.priority
    }

    if (this.element) {
      this.element.on('set:draworder', this._onDrawOrderChange, this)
    }
  }

  this.on(
    'attr:priority',
    function(val) {
      if (this.entity.spine) {
        this.entity.spine.spine.priority = val
      }
    },
    this,
  )
  this.on('destroy', () => {
    this.element.off('set:draworder', this._onDrawOrderChange, this)
  })
}
Spine.prototype._onDrawOrderChange = function(order) {
  this.entity.spine.spine.priority = (1 + order) / 1000.0
}
