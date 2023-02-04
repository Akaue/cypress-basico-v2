

// Utilizando lodash para repetir o teste, executando 3 vezes

Cypress._.times(3, function(){


    it('testando a pagina de privacidade', function(){

        cy.visit('./src/privacy.html')
    
    
    })


})
