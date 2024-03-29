var AppView = Backbone.View.extend({

  el: '#app',

  initialize: function() {
    this.videos = new Videos(this.collection);

    this.listenTo(this.videos, 'sync', this.selectFirst);

    this.videos.search('doggos');

    this.render();
    console.log(this.videos);
  },

  render: function() {
    this.$el.html(this.template());

    new SearchView({
      el: this.$('.search'),
      collection: this.videos
    }).render();

    new VideoPlayerView({
      el: this.$('.player'),
      model: this.videos.at(0),
      collection: this.videos
    }).render();

    new VideoListView({
      el: this.$('.list'),
      collection: this.videos
    }).render();

    return this;
  },

  selectFirst: function() {
    if (this.videos) {
      this.videos.at(0).select();
    }
  },

  template: templateURL('src/templates/app.html')

});
