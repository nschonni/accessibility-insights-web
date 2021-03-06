// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Action } from '../../common/flux/action';
import {
    SaveIssueFilingSettingsPayload,
    SetHighContrastModePayload,
    SetIssueFilingServicePayload,
    SetIssueFilingServicePropertyPayload,
    SetIssueTrackerPathPayload,
    SetTelemetryStatePayload,
} from './action-payloads';

export class UserConfigurationActions {
    public readonly setTelemetryState = new Action<SetTelemetryStatePayload>();
    public readonly getCurrentState = new Action<void>();
    public readonly setHighContrastMode = new Action<SetHighContrastModePayload>();
    public readonly setIssueFilingService = new Action<SetIssueFilingServicePayload>();
    public readonly setIssueFilingServiceProperty = new Action<SetIssueFilingServicePropertyPayload>();
    public readonly setIssueTrackerPath = new Action<SetIssueTrackerPathPayload>();
    public readonly saveIssueFilingSettings = new Action<SaveIssueFilingSettingsPayload>();
}
