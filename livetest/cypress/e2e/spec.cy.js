describe('frontpage', () => {
  it('passes', () => {
    cy.visit('https://water.europa.eu/freshwater')
    cy.get('body').toMatchImageSnapshot({
      imageConfig: {
        threshold: 0.001
      }
    })
  })
})
