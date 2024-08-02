// coding=utf-8

// Copyright [2024] [SkywardAI]
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';

import buildRoutes from './routes/index.js'

import swStats from 'swagger-stats';
import * as swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./swagger.json" with { type: "json" };

configDotenv()

const app = express();
app.use(cors());
app.use(bodyParser.json());

buildRoutes(app);

// swagger setup
app.use(swStats.getMiddleware({
    name: "Voyager Swagger Monitor",
    uriPath: '/stats',
    swaggerSpec
}))
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Voyager APIs"
}))

const PORT = process.env.PORT || 8000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`VOYAGER is running on port ${PORT}, happy sailing!`)
})