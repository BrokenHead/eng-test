<template>
  <div class="layout layout--vertical-align">
    <div class="container">
      <section class="section center">
        <h1 class="title title--1">Thanks for your interest in working for Aillio!</h1>
      </section>

      <section class="section">
        <div class="layout layout--hz layout--hz-equal layout--double-spacing layout--a-start layout--stack-tablet">
          <div>
            <template v-if="session.currentUser">
              <h3 class="title title--3">Congratulations! You have successfully completed the task.</h3>

              <ul>
                <li>
                  <p>Full Name: {{ session.currentUser.fullName }}</p>
                </li>
                <li>
                  <p>Email: {{ session.currentUser.email }}</p>
                </li>
                <li>
                  <p>ID: {{ session.currentUser.id }}</p>
                </li>
              </ul>
            </template>

            <template v-else>
              <h3 class="title title--3">You are not signed in.</h3>

              <p>Your task is to finish the existing authentication API logic and implement a sign in page. Please ask any questions you may have in your slack channel!</p>

              <div class="layout layout--hz layout--j-start">
                <RouterLink
                  class="button"
                  :to="{
                    name: 'signIn'
                  }"
                >
                  Sign In
                </RouterLink>
              </div>
            </template>
          </div>

          <div>
            <div class="group">
              <h3 class="title title--3">Actions</h3>

              <div class="layout layout--hz layout--j-start">
                <button type="button" class="button button--border button--small" @click="somethingPublic">
                  <span class="icon fa fa-globe color-primary"></span>
                  Public
                </button>
                <button type="button" class="button button--border button--small" @click="somethingPrivate">
                  <span class="icon fa fa-lock color-secondary"></span>
                  Private
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTheSession } from '../modules/session';
  import { useErrors } from '../modules/errors';
  import { SomethingPublicResponse, SomethingPrivateResponse } from 'shared/types/api';
  import http from '../services/http';
  import logger from '../services/logger';

  const { session } = useTheSession();
  const { handleError } = useErrors();

  async function somethingPrivate() {
    try {
      const response = await http.get<SomethingPrivateResponse>('/api/something-private');

      logger.info('Private Data', response.data);
    } catch (error) {
      handleError(error);
    }
  }

  async function somethingPublic() {
    try {
      const response = await http.get<SomethingPublicResponse>('/api/something-public');

      logger.info('Public Data', response.data);
    } catch (error) {
      handleError(error);
    }
  }
</script>
