package models

import "time"

type Coffee struct {
	ID          int
	Name        string
	Price       float64
	Description string
	Image       string
	Category    string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Tags        []Tag
}

// We want a way to add tags to a coffee
type Tag struct {
	ID   int
	Name string
}
