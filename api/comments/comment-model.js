
'use strict'

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT
    },
    key: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sectionKey: {
      type: DataTypes.INTEGER
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
}