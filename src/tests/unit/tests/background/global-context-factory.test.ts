// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IMock, It, Mock, MockBehavior } from 'typemoq';

import { BrowserAdapter, ChromeAdapter } from '../../../../background/browser-adapter';
import { CommandsAdapter } from '../../../../background/browser-adapters/commands-adapter';
import { StorageAdapter } from '../../../../background/browser-adapters/storage-adapter';
import { PersistedData } from '../../../../background/get-persisted-data';
import { GlobalContext } from '../../../../background/global-context';
import { GlobalContextFactory } from '../../../../background/global-context-factory';
import { Interpreter } from '../../../../background/interpreter';
import { LocalStorageData } from '../../../../background/storage-data';
import { CommandStore } from '../../../../background/stores/global/command-store';
import { FeatureFlagStore } from '../../../../background/stores/global/feature-flag-store';
import { LaunchPanelStore } from '../../../../background/stores/global/launch-panel-store';
import { TelemetryEventHandler } from '../../../../background/telemetry/telemetry-event-handler';
import { EnvironmentInfo } from '../../../../common/environment-info-provider';
import { IndexedDBAPI } from '../../../../common/indexedDB/indexedDB';
import { TelemetryDataFactory } from '../../../../common/telemetry-data-factory';
import { IssueFilingServiceProvider } from '../../../../issue-filing/issue-filing-service-provider';
import { CreateTestAssessmentProvider } from '../../common/test-assessment-provider';

describe('GlobalContextFactoryTest', () => {
    let _mockChromeAdapter: IMock<BrowserAdapter>;
    let _mockCommandsAdapter: IMock<CommandsAdapter>;
    let _mockStorageAdapter: IMock<StorageAdapter>;
    let _mocktelemetryEventHandler: IMock<TelemetryEventHandler>;
    let _mockTelemetryDataFactory: IMock<TelemetryDataFactory>;
    let _mockIssueFilingServiceProvider: IMock<IssueFilingServiceProvider>;
    let environmentInfoStub: EnvironmentInfo;
    let userDataStub: LocalStorageData;
    let idbInstance: IndexedDBAPI;
    let persistedDataStub: PersistedData;

    beforeAll(() => {
        _mockStorageAdapter = Mock.ofType<StorageAdapter>();
        _mockChromeAdapter = Mock.ofType(ChromeAdapter, MockBehavior.Loose);
        _mockCommandsAdapter = Mock.ofType<CommandsAdapter>();
        _mockChromeAdapter.setup(adapter => adapter.sendMessageToAllFramesAndTabs(It.isAny()));
        _mocktelemetryEventHandler = Mock.ofType(TelemetryEventHandler);
        _mockTelemetryDataFactory = Mock.ofType(TelemetryDataFactory);
        _mockIssueFilingServiceProvider = Mock.ofType(IssueFilingServiceProvider);

        userDataStub = {};
        environmentInfoStub = {} as EnvironmentInfo;
        persistedDataStub = {} as PersistedData;
        idbInstance = {} as IndexedDBAPI;
    });

    it('createContext', () => {
        const globalContext = GlobalContextFactory.createContext(
            _mockChromeAdapter.object,
            _mocktelemetryEventHandler.object,
            userDataStub,
            CreateTestAssessmentProvider(),
            _mockTelemetryDataFactory.object,
            idbInstance,
            persistedDataStub,
            _mockIssueFilingServiceProvider.object,
            environmentInfoStub,
            _mockStorageAdapter.object,
            _mockCommandsAdapter.object,
        );

        expect(globalContext).toBeInstanceOf(GlobalContext);
        expect(globalContext.interpreter).toBeInstanceOf(Interpreter);
        expect(globalContext.stores.commandStore).toBeInstanceOf(CommandStore);
        expect(globalContext.stores.featureFlagStore).toBeInstanceOf(FeatureFlagStore);
        expect(globalContext.stores.launchPanelStore).toBeInstanceOf(LaunchPanelStore);
    });
});
