// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/articles/:slug`
  | `/articles/:slug/edit`
  | `/articles/create`
  | `/feed`
  | `/login`
  | `/profiles/:username`
  | `/profiles/:username/favorites`
  | `/register`
  | `/settings`;

export type Params = {
  "/articles/:slug": { slug: string };
  "/articles/:slug/edit": { slug: string };
  "/profiles/:username": { username: string };
  "/profiles/:username/favorites": { username: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
