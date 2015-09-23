
'use strict'

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('User', {
    key: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING
    },
    screen_name: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.STRING
    },
    followers_count: {
      type: DataTypes.INTEGER
    },
    friends_count: {
      type: DataTypes.INTEGER
    },
    listed_count: {
      type: DataTypes.INTEGER
    },
    favourites_count: {
      type: DataTypes.INTEGER
    },
    time_zone: {
      type: DataTypes.STRING
    },
    statuses_count: {
      type: DataTypes.INTEGER
    },
    lang: {
      type: DataTypes.STRING
    },
    profile_background_color: {
      type: DataTypes.STRING
    },
    profile_background_image_url: {
      type: DataTypes.STRING
    },
    profile_image_url: {
      type: DataTypes.STRING
    },
    profile_image_url_https: {
      type: DataTypes.STRING
    },
    profile_banner_url: {
      type: DataTypes.STRING
    },
    following: {
      type: DataTypes.BOOLEAN
    },
    follow_request_sent: {
      type: DataTypes.BOOLEAN
    },
    suspended: {
      type: DataTypes.BOOLEAN
    }
  })
}