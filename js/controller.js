import * as model from './model.js';
import * as view from './view.js';

const controlStart = function(data) {
  model.initData(data);

  view.clearPlayground();
  view.enablePlayground();
  view.renderGameStateInfoText(model.state);
  view.hideModal();
}

const controlNew = function() {
  view.showModal();
}

const controlPlayground = function(cellId) {
  view.renderCell(cellId, model.state.activePlayer);
  model.updateCell(cellId);
  view.renderGameStateInfoText(model.state);
}

const init = function() {
  view.enablePlayground();
  view.renderGameStateInfoText(model.state);

  view.subscribeHandlerStart(controlStart);
  view.subscribeHandlerNew(controlNew);
  view.subscribeHandlerPlayground(controlPlayground);
}

init();
