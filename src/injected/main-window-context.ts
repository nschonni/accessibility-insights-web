// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BaseStore } from '../common/base-store';
import { DevToolActionMessageCreator } from '../common/message-creators/dev-tool-action-message-creator';
import { IssueFilingActionMessageCreator } from '../common/message-creators/issue-filing-action-message-creator';
import { DevToolState } from '../common/types/store-data/idev-tool-state';
import { UserConfigurationStoreData } from '../common/types/store-data/user-configuration-store';
import { EnvironmentInfoProvider } from './../common/environment-info-provider';
import { UserConfigMessageCreator } from './../common/message-creators/user-config-message-creator';
import { IssueFilingServiceProvider } from './../issue-filing/issue-filing-service-provider';
import { TargetPageActionMessageCreator } from './target-page-action-message-creator';

export class MainWindowContext {
    public constructor(
        private devToolStore: BaseStore<DevToolState>,
        private userConfigStore: BaseStore<UserConfigurationStoreData>,
        private devToolActionMessageCreator: DevToolActionMessageCreator,
        private targetPageActionMessageCreator: TargetPageActionMessageCreator,
        private issueFilingActionMessageCreator: IssueFilingActionMessageCreator,
        private userConfigMessageCreator: UserConfigMessageCreator,
        private environmentInfoProvider: EnvironmentInfoProvider,
        private issueFilingServiceProvider: IssueFilingServiceProvider,
    ) {}

    public getDevToolStore(): BaseStore<DevToolState> {
        return this.devToolStore;
    }

    public getUserConfigStore(): BaseStore<UserConfigurationStoreData> {
        return this.userConfigStore;
    }

    public getDevToolActionMessageCreator(): DevToolActionMessageCreator {
        return this.devToolActionMessageCreator;
    }

    public getTargetPageActionMessageCreator(): TargetPageActionMessageCreator {
        return this.targetPageActionMessageCreator;
    }

    public getIssueFilingActionMessageCreator(): IssueFilingActionMessageCreator {
        return this.issueFilingActionMessageCreator;
    }

    public getUserConfigMessageCreator(): UserConfigMessageCreator {
        return this.userConfigMessageCreator;
    }

    public getEnvironmentInfoProvider(): EnvironmentInfoProvider {
        return this.environmentInfoProvider;
    }

    public getIssueFilingServiceProvider(): IssueFilingServiceProvider {
        return this.issueFilingServiceProvider;
    }

    public static initialize(
        devToolStore: BaseStore<DevToolState>,
        userConfigStore: BaseStore<UserConfigurationStoreData>,
        devToolActionMessageCreator: DevToolActionMessageCreator,
        targetPageActionMessageCreator: TargetPageActionMessageCreator,
        issueFilingActionMessageCreator: IssueFilingActionMessageCreator,
        userConfigMessageCreator: UserConfigMessageCreator,
        environmentInfoProvider: EnvironmentInfoProvider,
        issueFilingServiceProvider: IssueFilingServiceProvider,
    ): void {
        window.mainWindowContext = new MainWindowContext(
            devToolStore,
            userConfigStore,
            devToolActionMessageCreator,
            targetPageActionMessageCreator,
            issueFilingActionMessageCreator,
            userConfigMessageCreator,
            environmentInfoProvider,
            issueFilingServiceProvider,
        );
    }

    public static getMainWindowContext(): MainWindowContext {
        return window.mainWindowContext;
    }

    public static getIfNotGiven(given: MainWindowContext): MainWindowContext {
        if (given) {
            return given;
        }
        return MainWindowContext.getMainWindowContext();
    }
}
