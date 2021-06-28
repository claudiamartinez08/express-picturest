/** WARNING:
 *  ⚠️ This is meant to be used only for learning propouses
 */

const fs = require("fs");

const getEntities = (jsonPath) => {
  const entities = require(appRoot + jsonPath);
  return entities;
};

const updateJSON = (jsonPath, newEntities) => {
  const stringifiedEntities = JSON.stringify(newEntities);
  fs.writeFileSync(appRoot + jsonPath, stringifiedEntities);
};

const persimon = (jsonPath) => {
  return {
    get: (id) =>
      getEntities(jsonPath).find((entity) => entity.id === parseInt(id)),
    all: () => getEntities(jsonPath),
    update: (id, editedObject) => {
      const entities = getEntities(jsonPath);
      let entityToUpdate;
      const filteredEntities = entities.filter((entity) => {
        if (entity.id === parseInt(id)) {
          entityToUpdate = entity;
          return false;
        }
        return true;
      });
      if (filteredEntities.length === entities.length) {
        return entities;
      }
      filteredEntities.push({
        ...entityToUpdate,
        ...editedObject,
        id: entityToUpdate.id,
      });
      updateJSON(jsonPath, filteredEntities);
      return filteredEntities;
    },
    create: (newObject) => {
      const entities = getEntities(jsonPath);
      const ids = entities.map((entity) => entity.id);
      entities.push({
        ...newObject,
        id: ids.length > 0 ? Math.max(...ids) + 1 : 1,
      });
      updateJSON(jsonPath, entities);
      return entities;
    },
    delete: (id) => {
      const entities = getEntities(jsonPath);
      const filteredEntities = entities.filter(
        (entity) => entity.id !== parseInt(id)
      );
      if (filteredEntities.length === entities.length) {
        return entities;
      }
      updateJSON(jsonPath, filteredEntities);
      return filteredEntities;
    },
  };
};

module.exports = persimon;
