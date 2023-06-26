import { e2e } from '@grafana/e2e';

/**
 * Dashboard
 */
const json = require('../../provisioning/dashboards/home.json');
const testedPanel = json.panels[0];

/**
 * Panel
 */
describe('Viewing the Home dashboard', () => {
  beforeEach(() => {
    e2e.flows.openDashboard({
      uid: json.uid,
    });
  });

  it('Should display a Time Series Panel', () => {
    const currentPanel = e2e.components.Panels.Panel.title(testedPanel.title);
    currentPanel.should('be.visible');
  });
});
