import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirDialogComponent} from "../components/confir-dialog/confir-dialog.component";

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {
      nonNullable: true
    }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {

      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  constructor(
    private hereosService: HeroesService,
    private activated: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    if (!this.router.url.includes('edit')) return;

    this.activated.params.pipe(
      switchMap(({id}) => this.hereosService.getHeroById(id))
    )
      .subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);

        return;
      })
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.hereosService.updateHero(this.currentHero).subscribe(
        hero => {
          this.showSnackbar(`${hero.superhero} update!`)
        }
      );

      return;
    }

    this.hereosService.addHero(this.currentHero).subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero} created!`)

    })
  }

  showSnackbar(message:  string):void  {
    this.snackbar.open(message, 'done', {
      duration: 2500,

    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirDialogComponent,
      {
        data: this.heroForm.value
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({result})
    })

  }
}
