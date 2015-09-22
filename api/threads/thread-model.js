
'use strict'

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Thread', {
    title: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postKey: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
}