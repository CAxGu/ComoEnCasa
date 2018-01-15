import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import CategoriasService from './categorias.service';
servicesModule.service('Categorias', CategoriasService);

import LocalesService from './locales.service';
servicesModule.service('Locales', LocalesService);

import ContactService from './contact.service';
servicesModule.service('Contact', ContactService);

import LocalService from './local.service';
servicesModule.service('Local', LocalService);

import StripeService from './stripe.service';
servicesModule.service('Stripe', StripeService);

export default servicesModule;
