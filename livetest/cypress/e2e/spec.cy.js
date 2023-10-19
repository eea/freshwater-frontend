describe('frontpage', () => {
  it('passes', () => {
    cy.visit('https://water.europa.eu/freshwater')
    cy.matchImage()
    // cy.compareSnapshot('homepage')
  })
})
