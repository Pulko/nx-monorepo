import { getBody, getInput, getListItem } from '../support/app.po';

describe('next-site', () => {
  it('should display index page', () => {
    cy.visit('/')
    getBody().should('be.ok')
  });

  it('should fetch data on input change', () => {
    cy.visit('/')
    getInput().first().type("bulb")
    getListItem().first().should('have.text', 'Bulbasaur')
  })

  it('should fetch data on server', () => {
    cy.visit('?q=bulb')
    getListItem().first().should('have.text', 'Bulbasaur')
  })
});
