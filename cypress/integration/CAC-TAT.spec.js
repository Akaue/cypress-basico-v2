/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visitPage()

    })


    it('Verifica o titulo da aplicação', function () {


        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')


    })

    it('Preencha os campos obrigatorios', function () {

        const longtext = 'sduiyasyuidhiusaihu iasdhiuasduisahudisa iasdhuiashdiusahduias diashdiuashduihasduiashdiuashdiu'

        cy.get('#firstName').type('Barnaebes')
        cy.get('#lastName').type('Alirio')
        cy.get('#email').type('olar@dfddsf.com')
        cy.get('#phone').type('11 9754436733')
        cy.get('#open-text-area').type(longtext, { delay: 0 })   // Usar o delay para aumentar ou reduzir o tempo de escrita


        cy.get('.success').should('not.be.visible')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')



    })
    it('Exibe mensagem de erro ao submeter o formulario com um email com formatação', function () {

        cy.get('#firstName').type('Barnaebes')
        cy.get('#lastName').type('Alirio')
        cy.get('#email').type('ola@..,cccc,')
        cy.get('#phone').type('11 9754436733')
        cy.get('#open-text-area').type('Testando')


        cy.get('.success').should('not.be.visible')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('Validar campo numero', function () {

        cy.get('#phone')
            .type('sdfsdfsdfdsf')
            .should('have.value', '')



    })

    it('Validar mensagem de erro é exibida', function () {

        cy.get('#firstName').type('Barnaebes').clear()
        cy.get('#lastName').type('Alirio')
        cy.get('#email').type('ola@akaue.com')
        cy.get('#phone-checkbox').click()
        //  cy.get('#phone').type('')
        cy.get('#open-text-area').type('Testando')
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()   // Utilizar o contains para encontrar o seletor e texto unico

        cy.get('.error').should('be.visible')



    })


    it('Validar mensagem de erro é exibida apos submit', function () {


        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')



    })


    it('Enviar submit com comando costumizado', function () {

        cy.fillMandatoryFieldsAndSubmit()



    })

    it('Selecione produtos', function () {

        cy.get('#product').select('YouTube').should('have.value', 'youtube')

        cy.get('#product').select('Blog').should('have.value', 'blog')

        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')



    })



    it('Selecione produtos pelo valor', function () {


        cy.get('#product').select('mentoria').should('have.value', 'mentoria')



    })

    it('Selecione produtos pelo indice', function () {


        cy.get('#product').select(1).should('have.value', 'blog')
        cy.get('#product').select(2).should('have.value', 'cursos')
        cy.get('#product').select(3).should('have.value', 'mentoria')


    })


    it('Marca o tipo de atendimento feedback', function () {


        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')



    })

    it('Marca mais de um tipo de atendimento ', function () {


        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback').should('be.checked')
        cy.get('input[type="radio"][value="ajuda"]').check().should('have.value', 'ajuda').should('be.checked')
        cy.get('input[type="radio"][value="elogio"]').check().should('have.value', 'elogio').should('be.checked')



    })

    it('Marca cada tipo de atendimento ', function () {

        // percorre todos os radios marcando e verificando se foi marcado

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })

    })



    it('Marca e desmarca cada tipo de atendimento ', function () {


        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')

        cy.get('#email-checkbox').uncheck().should('not.be.checked')
        cy.get('#email-checkbox').check().should('be.checked')

    })


    it('Marca e desmarca cada tipo de atendimento ', function () {


        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')

        cy.get('#email-checkbox').uncheck().should('not.be.checked')
        cy.get('#email-checkbox').check().should('be.checked')

    })



    it('Selecione um arquivo ', function () {

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')  //Verificando se selecionou o arquivo chamado example.json

            })


    })


    it('Selecione um arquivo utilizando drag and drop ', function () {

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')  //Verificando se selecionou o arquivo chamado example.json

            })


    })


    it('Selecione um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')


    })



    it('Verifica que site abre em outra aba sem a necessidade de um clique', function () {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')


    })



    // REMOVENDO O CAMPO TARGET PARA QUE SEJA POSSIVEL VALIDAR NA MESMA ABA, SEM A NECESSIDADE DE ABRIR OUTRA ABA
    it('Acessa a pagina removendo o target', function () {

        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')


    })




})


