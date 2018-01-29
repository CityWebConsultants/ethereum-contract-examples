import { Session } from 'meteor/session'


FlowRouter.route('/', {
    name: 'frontPage',
    action: function(params, queryParams) {
      BlazeLayout.render("frontPage");
    }
})

let contractRoutes = FlowRouter.group({
  prefix: '/contract/:contractAccountId',
  name: 'contractRoutes',
  triggersEnter: [function(context, redirect) {
    console.log(context)
    Session.setPersistent('contractAddress', context.params.contractAccountId)
    console.log('running group triggers')
    // console.log('ctx')
    // console.log(context)
    // at this point we want to intercept
  }]
})




//group pages and add a check for contract exiting
//how to deal with
//@todo group by contractAccountId - so we can run check and test is a contract


//BlazeLayout.render("mainLayout", {content: "blogHome"});
contractRoutes.route('/', {
    name: 'contract',
    action: function(params, queryParams) {
        BlazeLayout.render("loggedInPage")
        // want to pass a parameter to the page
        console.log("Yeah! We are on the contract landing page:", params.contractAccountId)
    }
})

contractRoutes.route('/my-account', {
    name: 'myAccount',
    action: function(params, queryParams) {
        BlazeLayout.render("myAccount")
        console.log("Yeah! We are on the myAccount:", params.contractAccountId)
    }
})

// FlowRouter.route('/contract/my-account/:contractAccountId', {
//     name: 'myAccount',
//     action: function(params, queryParams) {
//         BlazeLayout.render("myAccount")
//         console.log("Yeah! We are on the myAccount:", params.contractAccountId)
//     }
// })

contractRoutes.route('/admin', {
    name: 'admin',
    action: function(params, queryParams) {
        BlazeLayout.render("loggedInPage")
        console.log("Yeah! We are on the admin:", params.contractAccountId)
    }
})


contractRoutes.route('/admin/transfer-balances', {
    name: 'admin',
    action: function(params, queryParams) {
        BlazeLayout.render("transferBalances")
        console.log("Yeah! We are on the admin/transfer_balances:", params.contractAccountId)
    }
})

contractRoutes.route('/admin/transfer-owner', {
    //what should name be and how does it relate to other input and outputs
    name: 'transferOwner',
    action: function(params, queryParams) {
        BlazeLayout.render("transferOwner")
        console.log("Yeah! We are on the admin/accounts page:", params.contractAccountId)
    }
})

contractRoutes.route('/admin/destroy', {
    //what should name be and how does it relate to other input and outputs
    name: 'transferOwner',
    action: function(params, queryParams) {
        BlazeLayout.render("destroy")
        console.log("Yeah! We are on the admin/accounts page:", params.contractAccountId)
    }
})

contractRoutes.route('/admin/accounts', {
    name: 'accounts',
    action: function(params, queryParams) {
        BlazeLayout.render('accounts')
        console.log("on the accounts page", params.contractAccountId)
    }
})

contractRoutes.route('/log', {
    name: 'transactionLog',
    action: function(params, queryParams) {
      BlazeLayout.render('transactionLog')
    }
})

FlowRouter.route('/donut-button/:contractAccountId/', {
    name: 'donutButton',
    action: function(params, queryParams) {
        BlazeLayout.render('donutButton', {contractId: params.contractAccountId})
    }
})

FlowRouter.route('/logout', {
    name: 'logout',
    action: function(params, queryParams) {
      Session.clear()
      console.log(Session)
      FlowRouter.go('/')
    }
})



// Do routes
// Add pages
// Add permissions
// Retrieve contract
// a regular user should be able to see members in group
// they should also have names -- maybe go back and amend the contract
// how would you create a workflow around.

// could make this in to a router group.
