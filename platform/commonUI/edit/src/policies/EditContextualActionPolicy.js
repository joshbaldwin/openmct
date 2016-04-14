/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(
    [],
    function () {
        "use strict";

        /**
         * Policy controlling whether the context menu is visible when
         * objects are being edited
         * @memberof platform/commonUI/edit
         * @constructor
         * @implements {Policy.<Action, ActionContext>}
         */
        function EditContextualActionPolicy(navigationService) {
            this.navigationService = navigationService;
            //The list of objects disallowed on target object when in edit mode
            this.editBlacklist = ["copy", "follow", "window"];
            //The list of objects disallowed on target object that is not in
            // edit mode (ie. the context menu in the tree on the LHS).
            this.nonEditBlacklist = ["copy", "follow", "properties", "move", "link", "remove"];
        }

        EditContextualActionPolicy.prototype.allow = function (action, context) {
            var selectedObject = context.domainObject,
                navigatedObject = this.navigationService.getNavigation(),
                actionMetadata = action.getMetadata ? action.getMetadata() : {};

            if (navigatedObject.hasCapability('editor')) {
                if (!selectedObject.hasCapability('editor')){
                    //Target is in the context menu
                    return this.nonEditBlacklist.indexOf(actionMetadata.key) === -1;
                } else {
                    return this.editBlacklist.indexOf(actionMetadata.key) === -1;
                }
            } else {
                return true;
            }
        };

        return EditContextualActionPolicy;
    }
);