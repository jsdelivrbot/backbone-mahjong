app.models.UnicodeWithColoredBackTilePlug = app.models.UnicodeTilePlug.extend({
  draw_tile: function(positioned_tile) {
    var tile = positioned_tile.get('tile');
    var xyz = positioned_tile.get('xyz');

    var tile_image = $("<span>").
        css({
          left: xyz.x + this.tileDimensions.boardSideMargin + (positioned_tile.get('position').get('layer') * this.tileDimensions.tileDepth),
          top: xyz.y + this.tileDimensions.boardTopBottomMargin - (positioned_tile.get('position').get('layer') * this.tileDimensions.tileDepth),
          zIndex: (-1 * xyz.x) + xyz.y + (xyz.z * 1000), // 1000 := sloppy
          position: 'absolute',
        }).
        addClass("tile").
        addClass("on_board").
        tooltip({
          title: tile.get('name'),
          delay: {
            show: 2000,
          }
        });

    var bottom_tile_image = $("<span>").
        addClass("tile_bottom").
        css({
          left: 0,
          top: 0,
          position: 'absolute',
        }).
        css({
          fontSize: this.tileDimensions.fontSize,
          lineHeight: this.tileDimensions.lineHeight
        }).
        css({
          borderStyle: "solid",
          borderWidth: "1px 1px " + this.tileDimensions.tileDepth + "px " + this.tileDimensions.tileDepth + "px",
          borderRadius: (this.tileDimensions.tileWidth / 5) + "px",
        }).
        css({
          backgroundColor: "#ff6600",
          boarderColor: "#FF6600 #FF6600 #DD4400 #FF6600",
          color: "#ff6600"
        }).
        html(tile.get('value')).
        appendTo(tile_image);

    var top_tile_image = $("<span>").
        addClass("tile_top").
        addClass("category_" + tile.get('tile_category').get('short_name')).
        addClass("tile_" + tile.get('short_name')).
        css({
          left: (this.tileDimensions.tileDepth * 1) - 2, // the 2 here is bogus
          top: 0 - (this.tileDimensions.tileDepth * 1),
          position: 'absolute',
        }).
        css({
          fontSize: this.tileDimensions.fontSize,
          lineHeight: this.tileDimensions.lineHeight
        }).
        css({
          borderStyle: "solid",
          borderWidth: "1px 1px " + this.tileDimensions.tileDepth + "px " + this.tileDimensions.tileDepth + "px",
          borderRadius: (this.tileDimensions.tileWidth / 5) + "px",
          boxShadow: "",
        }).
        html(tile.get('value')).
        appendTo(tile_image);
    tile_image.
      appendTo(this.boardDiv);
    var tile_image_div = tile_image[0];
    positioned_tile.set({view: tile_image_div});
    jQuery.data(tile_image, 'tile', positioned_tile);
  },
  move_tile_to_history: function(positioned_tile)  {
    $(positioned_tile.get('view')).
      css({position: "static"}).css({zIndex: 1, boxShadow: ""})
  },
});