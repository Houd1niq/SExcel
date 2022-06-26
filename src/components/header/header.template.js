export function headerTemplate(state) {
  return `
          <input type="text" class="input" value="${state.tableName}" />
          <div>
            <div class="button" data-type="btn-delete">
              <span data-type="btn-delete" class="material-icons">delete</span>
            </div>
            <div class="button" data-type="btn-сlose">
              <span data-type="btn-сlose" class="material-icons">close</span>
            </div>
          </div>
    `;
}
