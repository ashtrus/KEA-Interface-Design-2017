/*!
 * InterfaceDesignKea
 * KEA Interface Design Mandatory 2
 * https://kea.dk
 * @author Anna, Joana, Patrick, Zygimantas
 * @version 1.0.0
 * Copyright 2017. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';
  
  // Globals
  var oUser, oUsers;

  var USERS = [
    {
      "id": 1,
      "profile": {
        "name": "John",
        "email": "a",
        "password": "1",
        "phone": 10101010,
        "address": "Tingvej 34 2300 K\u00f8benhavn",
        "companyName": "Ding Dong APS"
      }
    },
    {
      "id": 2,
      "profile": {
        "name": "Bob",
        "email": "b",
        "password": "2",
        "phone": 10101010,
        "address": "Amagerbrogade 58, 2300 K\u00f8benhavn S",
        "companyName": "Food store APS"
      }
    }
  ];

  // Save the Company data to localStorage
  localStorage.Users = JSON.stringify(USERS);
  oUsers = JSON.parse(localStorage.Users);

  function hideWindowsAndShowOneWindow(sWindowId) {
    $('.wdw').hide();
    $('#' + sWindowId).show();
  }

  $('#btnToggleNav').click(function () {
    $('nav ul').toggle();
  });

  $('#btnHomeMenu').click(function () {
    console.log('homepage click');
    hideWindowsAndShowOneWindow('wdw-search');
  });

  function loggedInMenu() {
    $('#btnLoginMenu').hide();
    $('#btnLogoutMenu').show();
    $('#btnProfileMenu').show();
    $('#btnRegisterMenu').hide();
  }

  function loggedOutMenu() {
    $('#btnLogoutMenu').hide();
    $('#btnLoginMenu').show();
    $('#btnProfileMenu').hide();
    $('#btnRegisterMenu').show();
  }

  // Start function
  $(function () {
    $('nav ul').hide();
    isLoggedIn();
  });


  /**********************************************************************/
  // Is logged in
  /**********************************************************************/

  function isLoggedIn() { 
    if (localStorage.loggedInUser) {
      console.log('user is logged in');
      // read text from  local storage and convert it into an object
      oUsers = JSON.parse(localStorage.Users);
      oUser = JSON.parse(localStorage.loggedInUser);
      loggedInMenu();
      // hideWindowsAndShowOneWindow('wdw-user-profile');
      hideWindowsAndShowOneWindow('wdw-search-results');
      userDetails(oUser);
    } else {
      console.log('no one logged in');
      loggedOutMenu();
    }
  }

  /**********************************************************************/
  // Login
  /**********************************************************************/

  $('#btnLoginMenu').click(function () {
    hideWindowsAndShowOneWindow('wdw-login');
    console.log('Login menu', oUsers);
  });

  function userDetails(user) {
    $('#wdw-user-profile').empty();

    var sProfileTemplate =
      `
      <div class="thumbnail profile-template">
        <h1 class="lbl-user-title text-center">${user.profile.name}</h1>
        <p class="lbl-user-cvr">CVR: <span>${user.profile.companyName}</span>
        <i class="fa fa-pencil btnEditUser pull-right" aria-hidden="true"></i></p>
        <p class="lbl-user-address">Address: <span>'${user.profile.address}</span></p>
        <p class="lbl-user-email">Email: <span>${user.profile.email}</span></p>\
        <p class="lbl-user-phone">Phone: <span>${user.profile.phone}</span></p>
      </div>
      `;

    $('#wdw-user-profile').append(sProfileTemplate);
  }

  function login() {
    var sUserEmail = $('#lblAdminEmail').val();
    var sUserPassword = $('#lblAdminPassword').val();
    console.log(sUserEmail, sUserPassword);

    $.each(oUsers, function (i, user) {

      if (sUserEmail === user.profile.email && sUserPassword === user.profile.password) {
        console.log('found');

        localStorage.loggedInUser = JSON.stringify(user);
        hideWindowsAndShowOneWindow('wdw-user-profile'); 
        loggedInMenu();
        userDetails(user);        
        return false; // break on found

      } else {
        console.log('error');
      }

    });
  }

  $('#btnLogin').on('click', login);

    
  /**********************************************************************/
  // Logout
  /**********************************************************************/
  
  $('#btnLogoutMenu').click(function () {
    console.log('logout click');
    hideWindowsAndShowOneWindow('wdw-search');
    loggedOutMenu();      
    window.localStorage.removeItem('loggedInUser');
    // $('');
  });

  /**********************************************************************/
  // Sign Up / Register
  /**********************************************************************/

  $('#btnRegisterMenu').click(function () {
    console.log('register click');
    hideWindowsAndShowOneWindow('wdw-signup');
  });

  /**********************************************************************/
  // Sign Up
  /**********************************************************************/

  $('#btnProfileMenu').click(function () {
    console.log('register click');
    hideWindowsAndShowOneWindow('wdw-user-profile');
  });

  /**********************************************************************/
  // Search Results
  /**********************************************************************/

  $('#btnSearch').click(function (e) {
    e.preventDefault();
    console.log('search clicked. results: ');
    hideWindowsAndShowOneWindow('wdw-search-results');
  });



})(jQuery, window, document);
