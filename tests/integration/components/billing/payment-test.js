import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StripeMock from 'travis/tests/helpers/stripe-mock';
import { stubConfig } from 'travis/tests/helpers/stub-service';
import { getContext } from '@ember/test-helpers';
import profilePage from 'travis/tests/pages/profile';

module('Integration | Component | billing-payment', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {

    const selectedPlan = {
      id: 1,
      name: 'A',
      builds: 5,
      amount: 20000,
      annual: false
    };

    const paymentInfo = {
      cardNumber: null,
      cardName: '',
      expiryDateMonth: '',
      expiryDateYear: '',
      cvc: '',
      discountCode: ''
    };

    const newSubscription = {
      billingInfo: {
        firstName: '',
        lastName: '',
        companyName: '',
        billingEmail: '',
        street: '',
        billingSuite: '',
        billingCity: '',
        bllingZip: '',
        country: '',
        vatId: ''
      }
    };

    this['actions'] = {
      handleSubmit: () => { },
      goToFirstStep: () => { },
      back: () => { },
      cancel: () => { }
    };

    this.setProperties({
      selectedPlan,
      paymentInfo,
      newSubscription
    });

    window.Stripe = StripeMock;
    let config = {
      mock: true,
      publishableKey: 'mock'
    };
    stubConfig('stripe', config, { instantiate: false });
    const { owner } = getContext();
    owner.inject('service:stripev3', 'config', 'config:stripe');
  });

  test('billing-payment renders correctly', async function (assert) {

    await render(hbs`<Billing::Payment 
      @paymentInfo={{paymentInfo}}
      @newSubscription={{newSubscription}}
      @cancel={{action 'cancel'}}
      @goToFirstStep={{action 'goToFirstStep'}}
      @back={{action 'back'}}
      @selectedPlan={{selectedPlan}}/>`);

    assert.dom('h3').hasText('Pay with card');
    assert.dom(profilePage.billing.billingPaymentForm.completePayment.scope).isVisible();
  });
});
