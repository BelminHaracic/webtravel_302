import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./pages/admin/admin.component";
import { HomeComponent } from "./pages/home/home.component";
import { ToSComponent } from "./pages/to-s/to-s.component";
import { DiscoveryComponent } from "./pages/discovery/discovery.component";
import { SupportComponent } from "./pages/support/support.component";
import { UserBookingComponent } from './pages/home/user-booking/user-booking.component'; // Import user booking component
import { AdminCommentsComponent } from "./pages/admin/admin-comments/admin-comments.component";


// Routes
const routes : Routes = [
    {path: "", redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'to-s', component: ToSComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'discovery', component: DiscoveryComponent},
    {path: 'support', component: SupportComponent},
    { path: 'user', component: UserBookingComponent },
    { path:  'comments', component: AdminCommentsComponent}

]

@NgModule({

    declarations:[],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],

})

export class AppRoutingModule {}