/* eslint-disable */
pc.extend(pc, function() {
    var SpineComponentData = function () {
        // serialized
        this.enabled = true;
        this.atlasAsset = null;
        this.textureAssets = [];
        this.skeletonAsset = null;
        this.speed = 1;
        this.screenSpace = false;

        // non-serialized
        this.spine = null;
        this.atlasData = null;
        this.textures = [];
        this.skeletonData = null;
    };
    SpineComponentData = pc.inherits(SpineComponentData, pc.ComponentData);

    return {
        SpineComponentData: SpineComponentData
    };
}());
