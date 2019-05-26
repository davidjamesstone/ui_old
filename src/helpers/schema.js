export function tableRelations (app, table) {
  const fkTypes = ['HasMany', 'HasOne', 'BelongsToOne', 'ManyToMany']

  return app.relations
    .filter(relation =>
      fkTypes.includes(relation.type) &&
      tableRelationTarget(relation).from.table === table.name)
}

export function tableRelationTarget (relation) {
  return relation.type === 'ManyToMany'
    ? relation.join.through
    : relation.join
}

export function columnRelations (app, table, columnName) {
  return tableRelations(app, table)
    .filter(relation => tableRelationTarget(relation).from.column === columnName)
}
