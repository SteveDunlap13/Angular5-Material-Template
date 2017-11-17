/*
import { OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ResourceService } from './';
import { ResourceSubmission } from '../models';
import { LoadingSpinnerService } from './'



@AutoUnsubscribe()
export class ResourceDataSource extends DataSource<any> implements OnInit, OnDestroy {

    private resultsLength = 0;
    private resourceSubscription: Subscription;

    constructor(
        private loadingSpinnerService: LoadingSpinnerService,
        private resourceService: ResourceService,
        private url: string,
        private paginator: MatPaginator,
        private sort: MatSort,
        private hasData: { value: boolean}) {

        super();

        setTimeout(() => {

            this.loadingSpinnerService.reveal();
        });

        // get submission total for pager
        this.resourceSubscription = this.resourceService.getSubmissionsCount(this.url)
            .subscribe((total: number) => {

                this.resultsLength = total;
                if (total === 0) {
                    this.hasData.value = false;
                }
            });
    }
    ngOnInit(): void {

    }
    ngOnDestroy(): void { }



    // Connect function called by the table to retrieve one stream containing the data to render.
    connect(): Observable<ResourceSubmission[]> {

        const displayDataChanges = [
            this.sort.sortChange,
            this.paginator.page
        ];

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        return Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {

                setTimeout(() => {

                    this.loadingSpinnerService.reveal();
                });

                return this.resourceService.getSubmissions(
                    this.url,
                    this.sort.active,
                    this.sort.direction,
                    this.paginator.pageIndex - 1, //pageIndex is zero based, -1 for first select
                    this.paginator.pageSize);
            })
            .map(submissions => {

                // Flip flag to show that loading has finished.
                //this.isLoadingResults = false;
                setTimeout(() => {

                    this.loadingSpinnerService.hide();
                });

                return submissions as ResourceSubmission[];
            })
            .catch(() => {

                setTimeout(() => {

                    this.loadingSpinnerService.hide();
                });
                return Observable.of(null);
            });
    }

    disconnect() { }
}
*/
